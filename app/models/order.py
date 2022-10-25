from .db import db

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    symbol = db.Column(db.String(6), db.ForeignKey("stocks.id") nullable=False)
    side = db.Column(db.String(4), nullable=False)
    position = db.Column(db.String(5), nullable=False)
    type = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)


    user = db.relationship("User", back_populates="orders")
    stock = db.relationship("Stock", back_populates="orders")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'symbol': self.symbol,
            'side': self.side,
            'position': self.position,
            'type': self.type
            'quantity': self.quantity
            'self': self.price,
        }
