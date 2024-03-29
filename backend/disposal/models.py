from django.db import models


class Site(models.Model):
    """
    Site model
    """

    id = models.AutoField(primary_key=True)
    image = models.CharField(max_length=50)
    opens = models.TimeField()
    closes = models.TimeField()
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)

    class Meta:
        db_table = "sites"

    def __str__(self):
        return self.name
    
class Challenge(models.Model):
    id = models.AutoField(primary_key=True)
    challenge = models.CharField(max_length=50)
    experience = models.IntegerField()

    class Meta:
        db_table = "challenges"

    def __str__(self):
        return self.challenge
