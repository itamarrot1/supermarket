from django.contrib import admin
from django.urls import path
from supermarket import views
from .views import MyTokenObtainPairView



urlpatterns = [
    path('',views.index),
    path('register',views.register),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('users_detailes/',views.users_ops),
    path('users_detailes/<int:id>',views.users_ops),
    path('products/',views.products),
    path('order/',views.place_order),
    path('products_detailes/',views.product_add_change_and_delete),
    path('products_detailes/<int:id>',views.product_add_change_and_delete),
]
