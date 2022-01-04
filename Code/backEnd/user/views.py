from django.shortcuts import render
from django.http import HttpResponse
from backEnd import settings
from qiniu import Auth
import json
import uuid

# Create your views here.
from . import models
from task.models import models as task

def register(request):
    if request.body :
        data = json.loads(request.body)
    else :
        return HttpResponse("失败")
    checkEmail = list(models.User.objects.values('Email').filter(Email = data['Email']))
    checkUsername = list(models.User.objects.values('Name').filter(Name = data['Name']))
    if checkEmail:
        return HttpResponse("邮箱已被注册")
    elif checkUsername:
        return HttpResponse("用户名已被占用")
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

def getToken(request):
    #需要填写你的 Access Key 和 Secret Key
    data = json.loads(request.body)
    access_key = 'ieRt9BMS-S8m8Fh0SmpLy9TFiTYdhEQisAungyBf'
    secret_key = 'oR9TWDPC1XKbZ90nnkjSlbBqrASsn8K3MMdVyuVk'
    #构建鉴权对象
    q = Auth(access_key, secret_key)
    #要上传的空间
    bucket_name = 'xklfire'
    #上传后保存的文件名
    key = data['Name']
    #生成上传 Token，可以指定过期时间等
    policy = {
     # 'callbackUrl':'https://requestb.in/1c7q2d31',
     # 'callbackBody':'filename=$(fname)&filesize=$(fsize)'
     # 'persistentOps':'imageView2/1/w/200/h/200'
     }
    #3600为token过期时间，秒为单位。3600等于一小时
    token = q.upload_token(bucket_name, key, 3600, policy)
    print(token)
    res = { 'token' : token }
    return HttpResponse(json.dumps(res))

