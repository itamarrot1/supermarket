# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework import status
from .serializer import UserSerializer,ProfileSerializer,ProductSerializer,OrderSerializer,MyTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Profile,Product,OrderDetails,Order
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView




 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer





@api_view(['GET'])
def index(req):
    return Response('hello')


@api_view(['POST'])
def register(req):
    username=req.data.get('username')
    password=req.data.get('password')
    address = req.data.get('address','')
    phone  =req.data.get('phone','')


    if not password[0].isupper():
        return Response({"error": "Password must start with an uppercase letter."}, status=status.HTTP_400_BAD_REQUEST)
    print(username,password,address,phone)
    user = User.objects.create_user(username=username, password=password)   
    user.is_active = True
    user.is_staff = False
    user.save()
    Profile.objects.create(user=user , address =address, phone=phone)
    return Response("new user % profile born")



@api_view(['GET' ,'DELETE','PUT'])
@permission_classes([IsAuthenticated])
def users_ops(req,id=-1):
    if req.method == 'GET':
        if req.user.is_staff:
            profiles = Profile.objects.all()
        else: 
            profiles = Profile.objects.filter(user = req.user)
        serializer = ProfileSerializer(profiles,many=True)
        return Response (serializer.data)
    if req.method == 'DELETE':
        try:
            temp_Profile = Profile.objects.get(id=id)
            
        except Profile.DoesNotExist:
            return Response ("user not exsist")
       
        temp=(temp_Profile.user.id)
        temp_use=User.objects.get(id=temp)
        temp_use.is_active=False
        temp_use.save()
        temp_Profile.delete()
        return Response ("user deleted succesfully")
    elif req.method == 'PUT':
        # Ensure user_id is provided for update
        if id is None:
            return Response({"error": "User ID must be provided."}, status=status.HTTP_400_BAD_req)

        try:
            # Retrieve the user and profile to be updated
            user = User.objects.get(id=id)
            profile = Profile.objects.get(user=user)
        except User.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Check permissions
        if not req.user.is_staff and user != req.user:
            return Response({"error": "You do not have permission to update this user."}, status=status.HTTP_403_FORBIDDEN)

        # Update the profile with the provided data
        serializer = ProfileSerializer(profile, data=req.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        

@api_view(['GET'])
def products(req):
    products =Product.objects.all()
    serializer = ProductSerializer (products,many=True)
    return Response (serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(req):

        
    products = req.data.get('products')  # Expecting a list of dicts with 'product_id' and 'amount'

    if not products:
        return Response({"error": "Products data is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Initialize total price
    total_price = 0

    # Create an order instance for the authenticated user
    order = Order.objects.create(customer=req.user)

    for item in products:
        product_id = item.get('product_id')
        amount = item.get('amount')

        if not product_id or not amount:
            return Response({"error": "Product ID and amount are required for each item."}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)

        # Check if sufficient stock is available
        if product.stock < amount:
            return Response({"error": f"Insufficient stock for product {product.name}."}, status=status.HTTP_400_BAD_REQUEST)
        # Calculate price and update total price
        product_price = product.price * amount
        total_price += product_price
        # Create order details
        OrderDetails.objects.create(order=order, product=product, amount=amount)

        # Update product stock
        product.stock -= amount
        product.save()

    # Update the order's total price
    order.total_price = total_price
    order.save()

    # Serialize and return the order details
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    


@api_view(['DELETE' , 'PUT','POST'])
@permission_classes([IsAuthenticated])
def product_add_change_and_delete(req,id=None):
    if not req.user.is_staff:
        return Response ("cant delete or change")
    if req.method == 'DELETE':
        temp_product= Product.objects.get(id=id)
        temp_product.delete()
    elif req.method == 'PUT':
        product = get_object_or_404(Product, id=id)
        serializer = ProductSerializer(product, data=req.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif req.method == 'POST':
        name=req.data.get('name')
        price=req.data.get('price')
        stock = req.data.get('stock')
        image  =req.data.get('image')
        Product.objects.create(name=name, price=price, stock=stock , image=image)
        return Response ("product added")