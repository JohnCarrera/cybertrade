from .db import db

class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    symbol = db.Column(db.String(6), db.ForeignKey("stocks.symbol"), nullable=False)
    price = db.Column(db.Float, nullable=True)
    quantity = db.Column(db.Float, nullable=False)
    balance = db.Column(db.Float, nullable=False)

    user = db.relationship("User", back_populates="transaction")
    stock = db.relationship("Stock", back_populates="transaction")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'symbol': self.symbol,
            'price': self.price,
            'quantity': self.quantity,
            'balance': self.balance

        }
