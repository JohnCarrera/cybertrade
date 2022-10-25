from .db import db

class Stock(db.Model):
    __tablename__ = "assets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    symbol = db.Column(db.String(6), db.ForeignKey("stocks.id") nullable=False)
    type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=True)
    quantity = db.Column(db.Integer, nullable = False)

    user = db.relationship("User", back_populates="asset")
    stock = db.relationship("Stock", back_populates="asset")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'symbol': self.symbol,
            'type': self.type,
            'value': self.value,
            'quantity': self.quantity
        }
