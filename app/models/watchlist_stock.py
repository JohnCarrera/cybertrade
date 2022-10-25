from .db import db

watchlist_stocks = db.Table(

    "watchlist_stocks",
    db.Model.metadata,
    db.Column(db.Integer, db.ForeignKey("watchlists.id"), nullable=False),
    db.Column(db.String(6), db.ForeignKey("stocks.id") nullable=False)
)
