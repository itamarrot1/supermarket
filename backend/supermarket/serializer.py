from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile,Product,Order,Category,OrderDetails
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ['id','username']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['id', 'username', 'address', 'phone'] 
    def get_username(self, obj):
        return obj.user.username  

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields= '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields= '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        token['address'] = user.profile.address
        token['number'] = user.profile.phone
        
        # ...
 
        return token