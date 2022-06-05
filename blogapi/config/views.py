from django.http import HttpResponse

def verifyView(request):
  return HttpResponse('Email successfuly verified. You can now close this window.')

