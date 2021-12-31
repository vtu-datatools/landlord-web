from django.contrib.gis.db import models


class CurrentIssues(models.Model):
    """A marker with name and location."""

    businessoperator = models.CharField(max_length=255, blank=True, null=True)
    detailurl = models.CharField(max_length=255, null=True)
    streetnumber = models.IntegerField(null=True)
    street = models.CharField(max_length=255, null=True)
    totaloutstanding = models.IntegerField(null=True)
    totalunits = models.IntegerField(null=True)
    geom = models.PointField(blank=True, null=True)
    geo_local_area = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self):
        """Return string representation."""
        return self.businessoperator

    def __unicode__(self):
        return self.businessoperator, self.geom

    class Meta:
        db_table = "current_issues"
