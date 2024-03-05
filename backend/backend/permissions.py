from rest_framework import permissions


class IsAdminOrSelf(permissions.BasePermission):
    """
    Allows access only to admin users or the user itself.
    """

    def has_permission(self, request, view):
        return request.user or request.user.role == 'admin'


class IsAdmin(permissions.BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return request.user.role == 'admin'
