from .db import db

class Stock(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    symbol = db.Column(db.String(6), db.ForeignKey("stocks.id") nullable=False)
    note = db.Column(db.Float, nullable=True)

    user = db.relationship("User", back_populates="notes")
    stock = db.relationship("Stock", back_populates="notes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'symbol': self.symbol,
            'note': self.note,
        }
