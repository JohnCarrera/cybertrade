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
    industry = db.Column(db.String(150))
    price = db.Column(db.Float)
    address = db.Column(db.String(200))
    averageVolume = db.Column(db.Integer)
    averageVolume10days = db.Column(db.Integer)
    beta = db.Column(db.Float)
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    debtToEquity = db.Column(db.Float)
    ebitda = db.Column(db.Integer)
    fiftyDayAverage = db.Column(db.Float)
    fiftyTwoWeekHigh = db.Column(db.Float)
    fiftyTwoWeekLow = db.Column(db.Float)
    floatShares = db.Column(db.Integer)
    forwardEps = db.Column(db.Float)
    forwardPE = db.Column(db.Float)
    freeCashflow = db.Column(db.Integer)
    fullTimeEmployees = db.Column(db.Integer)
    grossMargins = db.Column(db.Float)
    grossProfits = db.Column(db.Integer)
    heldPercentInsiders = db.Column(db.Float)
    heldPercentInstitutions = db.Column(db.Float)
    logo_url = db.Column(db.String(200))
    longBusinessSummary = db.Column(db.String(2000))
    longName = db.Column(db.String(200))
    marketCap = db.Column(db.Integer)
    operatingCashflow = db.Column(db.Integer)
    operatingMargins = db.Column(db.Float)
    phone = db.Column(db.String(20))
    profitMargins = db.Column(db.Float)
    recommendationKey = db.Column(db.String(20))
    recommendationMean = db.Column(db.Float)
    revenueGrowth = db.Column(db.Float)
    revenuePerShare = db.Column(db.Float)
    sector = db.Column(db.String(100))
    sharesOutstanding = db.Column(db.Integer)
    sharesShort = db.Column(db.Integer)
    shortName = db.Column(db.String(100))
    shortPercentOfFloat = db.Column(db.Float)
    shortRatio = db.Column(db.Float)
    state = db.Column(db.String(20))
    totalCash = db.Column(db.Integer)
    totalCashPerShare = db.Column(db.Float)
    totalDebt = db.Column(db.Integer)
    totalRevenue = db.Column(db.Integer)
    twoHundredDayAverage = db.Column(db.Float)
    volume = db.Column(db.Integer)
    website = db.Column(db.String(200))
    zip_code = db.Column(db.String(10))

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
