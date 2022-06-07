from django.contrib import admin

from .models import Question, Choice

admin.site.site_header = "Pollster Admin"
admin.site.site_title = "Pollster Admin Area"
admin.site.index_title = "Welcome to the Pollster Admin Area"


class ChoiceInLine(admin.TabularInline):
    model = Choice
    readonly_fields = ("votes",)
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ("id", "pub_date")
    fields = ("id", "pub_date", "question_text")

    inlines = [ChoiceInLine]


admin.site.register(Question, QuestionAdmin)
