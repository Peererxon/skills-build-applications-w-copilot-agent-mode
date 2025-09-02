from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Limpiar colecciones usando pymongo
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.workouts.delete_many({})
        db.leaderboard.delete_many({})

        # Poblar con Django ORM
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)
        diana = User.objects.create(name='Diana Prince', email='diana@dc.com', team=dc)

        Activity.objects.create(user=tony, type='Running', duration=30, date='2025-09-01')
        Activity.objects.create(user=steve, type='Cycling', duration=45, date='2025-09-01')
        Activity.objects.create(user=clark, type='Swimming', duration=60, date='2025-09-01')
        Activity.objects.create(user=diana, type='Yoga', duration=50, date='2025-09-01')

        w1 = Workout.objects.create(name='Hero HIIT', description='High intensity for heroes')
        w2 = Workout.objects.create(name='Power Yoga', description='Yoga for super strength')
        w1.suggested_for.add(marvel, dc)
        w2.suggested_for.add(dc)

        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
