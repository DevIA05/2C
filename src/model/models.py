# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Monitoring(models.Model):
    pathimg = models.TextField()
    date = models.DateTimeField()
    ctgbyuser = models.TextField()
    ctgbymodel = models.TextField()
    namemodel = models.TextField()
    accuracy = models.DecimalField(max_digits=3, decimal_places=2, 
                                   validators=[MinValueValidator(0), MaxValueValidator(1)])
    id = models.AutoField(primary_key=True)

    class Meta:

        db_table = 'Monitoring'


class MultipleImage(models.Model):
    pathimg = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True)

    class Meta:

        db_table = 'MultipleImage'
