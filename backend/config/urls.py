from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

admin.site.site_header = "BenDev — Administration"
admin.site.site_title = "BenDev"
admin.site.index_title = "Contenu du portfolio"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

# Les visuels televerses depuis l'admin. WhiteNoise ne gere que les statiques :
# on sert MEDIA_ROOT par Django, ce qui suffit au trafic d'un portfolio.
# Attention : sur un hebergement au disque ephemere (Render sans disque
# persistant), ces fichiers sont perdus a chaque redeploiement.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {"document_root": settings.MEDIA_ROOT},
        )
    ]
