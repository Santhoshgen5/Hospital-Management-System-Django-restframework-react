from django.urls import path
from.import views

urlpatterns=[
    path('login/', views.login_view.as_view(), name='login'),
    path('register/', views.register_view.as_view(), name='register'),
    
    # Appointment api urls
    path('doctor_appointment/', views.Appoiment_List_doctor.as_view()),
    path('nurse_appointment/', views.Appoiment_List_nurse.as_view()),
    path('patient_appointment/', views.Appoiment_List_patient.as_view()),
    
    # update Appointment api urls
    path('nurse_Appointment_update/<int:pk>/', views.Appointment_update_nurse.as_view()),
    path('doctor_Appointment_update/<int:pk>/', views.Appointment_update_doctor.as_view()),
    
    
    # Receipt api urls
    path('doctor_Receipt/', views.Receipt_List_doctor.as_view()),
    path('nurse_Receipt/', views.Receipt_List_nurse.as_view()),
    path('patient_Receipt/', views.Receipt_List_patient.as_view()),
    
    # Profile View
    path('Profile_view/', views.profile_view.as_view()),
    path('profile_update/<int:pk>', views.profile_update.as_view()),
    path('users_view/', views.Users_view.as_view()),
    path('bookappointments/', views.BookAppointments.as_view())
    
    
]