from app.models import db, Asset

def seed_assets():
    demo = Asset(
        user_id=1,
        symbol='_CASH',
        type='CASH',
        value=1,
        quantity=50000
    )

    db.session.add(demo)
    db.session.commit()


def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
