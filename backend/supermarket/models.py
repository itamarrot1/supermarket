from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    address=models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    def __str__(self):
        return f'{self.user} {self.address} {self.phone}'


class Category(models.Model):
    name=models.CharField(max_length=255)
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} {self.price}"
    


class Order(models.Model):
    ## order id 
    customer = models.ForeignKey(User , on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ], default='Pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    def __str__(self):
        return f'{self.customer} {self.created_at} {self.status}'
    
class OrderDetails(models.Model):
    ##order_det id
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    amount = models.PositiveBigIntegerField()
    def __str__(self):
        return f'{self.order} {self.product} {self.amount}'
