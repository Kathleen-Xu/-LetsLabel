"""backEnd URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Square
    2. Add a URL to urlpatterns:  path('', Square.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.core.serializers.json import Serializer
from django.urls import path

from user import views as user_view
from task import views as task_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/',user_view.register),
    path('login/',user_view.login),
    path('getusername/',user_view.getUserName),
    path('gettoken/',user_view.getToken),
    path('post/',task_view.postTask),
    path('fetch/',task_view.fetchTask),
    path('submit/',task_view.submit),
    path('check/',task_view.check),
]
