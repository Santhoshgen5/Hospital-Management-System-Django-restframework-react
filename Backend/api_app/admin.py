from django.contrib import admin
from .models import User, Receipt, Appointment, User_Profile
from .forms import CustomUserForm
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserForm
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'role'),
        }),
    )
    
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Roles',
            {
                'fields': (
                    'role',
                ),
            },
        ),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Receipt)
admin.site.register(Appointment)
admin.site.register(User_Profile)