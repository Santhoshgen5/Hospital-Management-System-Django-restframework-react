from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework import generics,status
from .serializers import UserLoginSerializer, UserRegisterSerializer, AppointmentSerializer, ReceiptSerializer, UserProfileSerializer, UserSerializer, BookAppointmentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsDoctor, IsNurse, IsPatient
from .models import Appointment, Receipt, User, User_Profile
# Create your views here.


class login_view(APIView):
    
    permission_classes=[AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user:
            token = RefreshToken.for_user(user)
            return Response ({
                'refresh': str(token),
                'access': str(token.access_token),
                'role': user.role,
                
            })
        else:
            return Response ({
                'info': 'Invalid credentials'
            }, status=401)

class register_view(generics.CreateAPIView):  
    serializer_class = UserRegisterSerializer
    permission_classes=[AllowAny]
    
    
    
    
# Appointments api Views  ###################################


class Appoiment_List_doctor(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes=[IsAuthenticated, IsDoctor]
    
    def get_queryset(self):
        return Appointment.objects.filter(doctor=self.request.user)
    
    
class Appoiment_List_patient(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes=[IsAuthenticated, IsPatient]
    
    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)
    
class Appoiment_List_nurse(generics.ListAPIView):
    
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated, IsNurse]
    
    
# Reciept api Views  ###################################
class Receipt_List_doctor(generics.ListAPIView):
    serializer_class = ReceiptSerializer
    permission_classes=[IsAuthenticated, IsDoctor]
    
    def get_queryset(self):
        return Receipt.objects.filter(doctor=self.request.user)
    
    
class Receipt_List_patient(generics.ListAPIView):
    serializer_class = ReceiptSerializer
    permission_classes=[IsAuthenticated, IsPatient]
    
    def get_queryset(self):
        return Receipt.objects.filter(patient=self.request.user)
    
class Receipt_List_nurse(generics.ListAPIView):
    
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
    permission_classes = [IsAuthenticated, IsNurse]
    
    
    
# Update  Api View

class Appointment_update_nurse(generics.UpdateAPIView):                                                                                  
    queryset = Appointment.objects.all()                                             
    serializer_class = AppointmentSerializer                                                                                      # (optional) overwritting patch.  By default it's allow put and patch we ristrict put() so we overite only put 
    permission_classes=[IsAuthenticated, IsNurse]                                                                       

    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

class Appointment_update_doctor(generics.UpdateAPIView):                                                                                                                              
    serializer_class = AppointmentSerializer                                                                                      
    permission_classes=[IsAuthenticated, IsDoctor]     
    
    def get_queryset(self):
        return Appointment.objects.filter(doctor = self.request.user)                                                                  

    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class Appointment_update_patient(generics.UpdateAPIView):                                                                                                                              
    serializer_class = AppointmentSerializer                                                                                      
    permission_classes=[IsAuthenticated, IsNurse]     
    
    def get_queryset(self):
        return Appointment.objects.filter(patient = self.request.user)                                                                  

    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
   
    
class Receipt_update(generics.UpdateAPIView):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
    permission_classes=[IsAuthenticated, IsDoctor, IsNurse]

    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

class profile_view(generics.ListAPIView):
    
    
    serializer_class = UserProfileSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        return User_Profile.objects.filter(user_name = self.request.user.id)
    
class profile_update(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes=[]
    
    def get_queryset(self):
        return User_Profile.objects.filter(user_name = self.request.user.id)
    
    def put(self, request, *args, **kwargs):
        return Response({"detail": "Method \"PUT\" not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
    
class Users_view(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated]
    queryset = User.objects.all()
    
class BookAppointments(generics.CreateAPIView):
    serializer_class = BookAppointmentSerializer
    permission_classes=[AllowAny]
    
    

    
    
    

    
        
    
