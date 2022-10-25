from .db import db
from .watchlist_stock import watchlist_stocks

class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(150), nullable=False)

    user = db.relationship("User", back_populates="watchlists")
    stock = db.relationship("Stock", secondary=watchlist_stocks back_populates="watchlists")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
        }
