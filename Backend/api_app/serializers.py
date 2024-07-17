from rest_framework import serializers
from .models import User, Appointment, Receipt, User_Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id', 'username', 'role']

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    
class AppointmentSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    class Meta:
        model=Appointment
        fields = "__all__"
        
class BookAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        
        exclude = ["status"]
        
        
class ReceiptSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    class Meta:
        model=Receipt
        fields = "__all__"

        

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['id','username', 'password', 'role']
        extra_kwargs = {'password':{'write_only':True}}
        
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    

class UserProfileSerializer(serializers.ModelSerializer):
    user_name = UserSerializer()
    
    class Meta:
        model = User_Profile
        fields = "__all__"