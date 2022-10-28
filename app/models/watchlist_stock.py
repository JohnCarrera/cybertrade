from .db import db

watchlist_stock = db.Table(
    "watchlist_stocks",
    db.Model.metadata,
    db.Column("watchlist_id", db.Integer, db.ForeignKey("watchlists.id"), nullable=False),
    db.Column("stock_id", db.Integer, db.ForeignKey("stocks.id"), nullable=False)
)

class Stock(db.Model):
    __tablename__ = "stocks"

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(5), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    industry = db.Column(db.String(50), nullable=False)
    # market_cap = db.Column(db.Float, nullable = False)

    watchlist = db.relationship("Watchlist", secondary=watchlist_stock, back_populates="stocks")
    asset = db.relationship("Asset", back_populates="stock")
    transaction = db.relationship("Transaction", back_populates="stock")
    note = db.relationship("Note", back_populates="stock")
    order = db.relationship("Order", back_populates="stock")


    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'name': self.name,
            'industry': self.industry,
        }


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(150), nullable=False)


    user = db.relationship("User", back_populates="watchlist")
    stocks = db.relationship("Stock", secondary=watchlist_stock, back_populates="watchlist")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'stocks': [stock.symbol for stock in self.stocks]
        }
