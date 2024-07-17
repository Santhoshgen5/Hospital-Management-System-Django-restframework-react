from rest_framework.permissions import BasePermission

class IsNurse(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'nurse'
    
class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'doctor'
    
class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'patient'