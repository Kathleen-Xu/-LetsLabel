from django.shortcuts import render
from django.http import HttpResponse
from backEnd import settings
import json
import uuid

# Create your views here.
from . import models
def good(request):
    print("123")
    return HttpResponse("打印成功！")
def register(request):
    if request.body :
        data = json.loads(request.body)
    else :
        return HttpResponse("失败")
    checkEmail = list(models.User.objects.values('Email').filter(Email = data['Email']))
    if checkEmail:
        return HttpResponse("邮箱已被注册")
    else:
        data['UID'] = uuid.uuid4()
        models.User.objects.create(**data)
        return HttpResponse("注册成功！")

def login(request):
    data = json.loads(request.body)
    loginIngUser = list(models.User.objects.values('Password').filter(Email=data['Email']))
    if loginIngUser:
        if loginIngUser[0]['Password'] == data['Password']:
            return HttpResponse("密码正确")
        else:
            return HttpResponse("密码错误")
    else:
        return HttpResponse("未注册")

def getUserName(request):
    data = json.loads(request.body)
    loginUser = list(models.User.objects.values('Name').filter(Email = data['Email']))
    if loginUser:
        return HttpResponse(loginUser[0]['Name'])
    else:
        return HttpResponse("没这个人")
