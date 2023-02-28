# Generated by Django 4.1.6 on 2023-02-28 10:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Monitoring',
            fields=[
                ('pathimg', models.TextField()),
                ('date', models.DateTimeField()),
                ('ctgbyuser', models.TextField()),
                ('ctgbymodel', models.TextField()),
                ('namemodel', models.TextField()),
                ('accuracy', models.DecimalField(decimal_places=2, max_digits=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(1)])),
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'Monitoring',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MultipleImage',
            fields=[
                ('pathimg', models.TextField(blank=True, null=True)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'MultipleImage',
                'managed': False,
            },
        ),
    ]
