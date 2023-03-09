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
    pathimg = models.TextField(null=False, blank=False)
    date = models.TextField(blank=True, null=True)
    heure = models.TextField(blank=True, null=True)
    ctgbyuser = models.TextField(null=False, blank=False)
    ctgbymodel = models.TextField(null=False, blank=False)
    namemodel = models.TextField(null=False, blank=False)
    accuracy = models.DecimalField(max_digits=3, decimal_places=2, 
                                   null=False, blank=False, 
                                   validators=[MinValueValidator(0), MaxValueValidator(1)])
    id = models.AutoField(primary_key=True)

    class Meta:

        db_table = 'Monitoring'


class MultipleImage(models.Model):
    pathimg = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True)

    class Meta:

        db_table = 'MultipleImage'

class Modeles(models.Model):
    pathmodele = models.TextField(blank=True, null=True)
    namemodel = models.TextField(null=False, blank=True)
    listctg = models.TextField(null=False, blank=True)
    id = models.AutoField(primary_key=True)
    perf = models.DecimalField(max_digits=3, decimal_places=2, 
                                   null=False, default=0,
                                   validators=[MinValueValidator(0), MaxValueValidator(1)])
    class Meta:

        db_table = 'Modeles'