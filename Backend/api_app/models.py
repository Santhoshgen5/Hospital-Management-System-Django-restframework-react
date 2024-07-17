from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.db.models.signals import post_save

class User(AbstractUser):
    ROLE_CHOICES = (
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
        ('nurse', 'Nurse'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    
    

class Receipt(models.Model):
    receipt_no = models.PositiveBigIntegerField()
    patient = models.ForeignKey(User, related_name='patient_receipts', on_delete=models.CASCADE)
    doctor = models.ForeignKey(User, related_name='doctor_receipts', on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_Status = models.CharField(max_length=10)
    date_issued = models.DateTimeField(auto_now_add=True)
    details = models.TextField()
    
    def __str__(self):
        return f"{self.patient.username} Receipt" 

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    patient = models.ForeignKey(User, related_name='patient_appointments', on_delete=models.CASCADE)
    doctor = models.ForeignKey(User, related_name='doctor_appointments', on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Appointment with Dr. {self.doctor.username} for {self.patient.username} on {self.appointment_date}"



class User_Profile(models.Model):
    user_name = models.OneToOneField(User,  on_delete=models.CASCADE)
    user_city = models.CharField(max_length=50, null=True, blank=True)
    user_phno = models.PositiveBigIntegerField(null=True, blank=True)
    user_address = models.TextField(null=True, blank=True)
    user_profile_pic = models.ImageField(upload_to='user_profile_pic', null=True, blank=True)
    user_banner = models.ImageField(upload_to='user_banner', null=True, blank=True)
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:  
        User_Profile.objects.create(user_name=instance)
        
post_save.connect(create_user_profile, sender=User)
      
      
def save_user_profile(sender, instance, **kwargs):
    instance.user_profile.save()
    
post_save.connect(save_user_profile, sender=User)