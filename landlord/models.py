from django.contrib.gis.db import models


class CurrentEvents(models.Model):
    """A marker with name and location."""

    businessoperator = models.CharField(max_length=255)
    geom = models.PointField(blank=True, null=True)
    detailurl = models.CharField(max_length=255)
    totaloutstanding = models.IntegerField()

    def __str__(self):
        """Return string representation."""
        return self.businessoperator

    def __unicode__(self):
        return self.businessoperator, self.geom

    class Meta:
        db_table = 'current_events'
