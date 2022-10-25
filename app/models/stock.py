from .db import db
from .watchlist_stock import watchlist_stock



class Stock(db.Model):
    __tablename__ = "stocks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    industry = db.Column(db.String(50), nullable=False)
    market_cap = db.Column(db.Float, nullable = False)

    watchlist = db.relationship("Watchlist", secondary=watchlist_stock, back_populates="stock")
    asset = db.relationship("Asset", back_populates="stock")
    transaction = db.relationship("Transaction", back_populates="stock")
    note = db.relationship("Note", back_populates="stock")
    order = db.relationship("Order", back_populates="stock")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'industry': self.industry,
            'market_cap': self.market_cap
        }
