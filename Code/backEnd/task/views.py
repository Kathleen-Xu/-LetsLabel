from django.shortcuts import render
from django.http import HttpResponse
from backEnd import settings
import json
import uuid

from . import models
from user.models import User as User

# Create your views here.
def postTask(request):
    data = json.loads(request.body)
    task = models.Task.objects.create(
        PID=uuid.uuid4(), 
        Name=data['Name'], 
        Owner=data['Email'], 
        IsSubmitted=False,
        IsPassed="pending"
    )
    task.save()
    for item in data['ImageList']:
        itemImg = models.Image.objects.create(
            PID=uuid.uuid4(), 
            Name=item['Name'], 
            Url=item['Url']
        )
        itemImg.save()
        task.Img.add(itemImg)
    return HttpResponse("发布成功")    

def fetchTask(request):
    data = json.loads(request.body)
    if data['Role'] == 'poster':
        taskList = list(models.Task.objects.values().filter(Owner=data['Email']).order_by('-PostTime'))
    elif data['Role'] == 'submitter':
        sub = User.objects.values().filter(Email=data['Email']).first()
        taskList = list(models.Task.objects.values().filter(Submitter=sub['UID']).order_by('-PostTime'))
    elif data['Type'] == 'off':
        taskList = list(models.Task.objects.values().filter(IsSubmitted=True))
    elif data['Type'] == 'on':
        taskList = list(models.Task.objects.values().filter(IsSubmitted=False))
    else :
        taskList = list(models.Task.objects.values().all())
    res = []
    for task in taskList:
        imgRes = []
        taskOb = models.Task.objects.get(PID=task['PID'])
        imgList = list(taskOb.Img.values().all())
        if task['IsSubmitted']:
            submitter = User.objects.values().filter(PID=task['Submitter']).first()
            taskDict = {
                'UID': str(task['PID']),
                'Name': task['Name'], 
                'Owner': task['Owner'],
                'PostTime': task['PostTime'],
                'IsSubmitted': task['IsSubmitted'],
                'Submitter': submitter['Name'],
                'IsPassed': task['IsPassed']
            }
            for img in imgList:
                imgDict = {
                    'UID': str(img['PID']),
                    'Name': img['Name'], 
                    'Url': img['Url']
                }
                anttRes = []
                imgOb = models.Image.objects.get(PID=img['PID'])
                anttList = list(imgOb.Antt.values().all())
                for antt in anttList:
                    anttRes.append({
                        'UID': str(antt['PID']),
                        'Name': antt['Name'],
                        'Xmin': antt['Xmin'],
                        'Ymin': antt['Ymin'],
                        'Xmax': antt['Xmax'],
                        'Ymax': antt['Ymax']
                    })
                imgDict['Annotation']=anttRes
                imgRes.append(imgDict)
        else: 
            taskDict = {
                'UID': str(task['PID']),
                'Name': task['Name'], 
                'Owner': task['Owner'],
                'PostTime': task['PostTime'].strftime('%Y-%m-%d'),
                'IsSubmitted': task['IsSubmitted'],
                'Submitter': "",
                'IsPassed': task['IsPassed']
            }
            for img in imgList:
                imgRes.append({
                    'UID': str(img['PID']),
                    'Name': img['Name'], 
                    'Url': img['Url'],
                })

        taskDict['Img']=imgRes;
        res.append(taskDict)
    return HttpResponse(json.dumps(res))


def submit(request):
    data = json.loads(request.body)
    taskOb = models.Task.objects.get(PID=uuid.UUID(data['TaskId']))
    submitter = User.objects.filter(Email=data['Email']).first()
    taskOb.Submitter.add(submitter)
    taskOb.IsSubmitted = True
    taskOb.save()
    for item in data['ImageList']:
        imgOb = models.Image.objects.get(PID=uuid.UUID(item['UID']))
        imgOb.Weight = item['Weight']
        imgOb.Height = item['Height']
        imgOb.save()
        for i in item['Annotation']:
            antt = models.Annotation.objects.create(
                PID=uuid.uuid4(), 
                Name=i['Name'], 
                Xmin=i['Xmin'],
                Ymin=i['Ymin'],
                Xmax=i['Xmax'],
                Ymax=i['Ymax'],
            )
            antt.save()
            imgOb.Antt.add(antt)
    return HttpResponse("提交成功") 

def check(request):
    data = json.loads(request.body)
    result = str(data['Result'])
    taskOb = models.Task.objects.get(PID=uuid.UUID(data['TaskId']))
    taskOb.IsPassed = result
    taskOb.save()
    return HttpResponse("复核成功")

