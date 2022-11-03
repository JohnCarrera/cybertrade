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
    symbol = db.Column(db.String(6), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    industry = db.Column(db.String(150))
    price = db.Column(db.Float)
    address = db.Column(db.String(200))
    averageVolume = db.Column(db.BigInteger)
    averageVolume10days = db.Column(db.BigInteger)
    beta = db.Column(db.Float)
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    debtToEquity = db.Column(db.Float)
    ebitda = db.Column(db.Integer)
    fiftyDayAverage = db.Column(db.Float)
    fiftyTwoWeekHigh = db.Column(db.Float)
    fiftyTwoWeekLow = db.Column(db.Float)
    floatShares = db.Column(db.BigInteger)
    forwardEps = db.Column(db.Float)
    forwardPE = db.Column(db.Float)
    freeCashflow = db.Column(db.BigInteger)
    fullTimeEmployees = db.Column(db.BigInteger)
    grossMargins = db.Column(db.Float)
    grossProfits = db.Column(db.BigInteger)
    heldPercentInsiders = db.Column(db.Float)
    heldPercentInstitutions = db.Column(db.Float)
    logo_url = db.Column(db.String(200))
    longBusinessSummary = db.Column(db.String(2000))
    longName = db.Column(db.String(200))
    marketCap = db.Column(db.BigInteger)
    operatingCashflow = db.Column(db.BigInteger)
    operatingMargins = db.Column(db.Float)
    phone = db.Column(db.String(20))
    profitMargins = db.Column(db.Float)
    recommendationKey = db.Column(db.String(20))
    recommendationMean = db.Column(db.Float)
    revenueGrowth = db.Column(db.Float)
    revenuePerShare = db.Column(db.Float)
    sector = db.Column(db.String(100))
    sharesOutstanding = db.Column(db.BigInteger)
    sharesShort = db.Column(db.BigInteger)
    shortName = db.Column(db.String(100))
    shortPercentOfFloat = db.Column(db.Float)
    shortRatio = db.Column(db.Float)
    state = db.Column(db.String(20))
    totalCash = db.Column(db.BigInteger)
    totalCashPerShare = db.Column(db.Float)
    totalDebt = db.Column(db.BigInteger)
    totalRevenue = db.Column(db.BigInteger)
    twoHundredDayAverage = db.Column(db.Float)
    volume = db.Column(db.BigInteger)
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
            'price': self.price
        }

    def to_big_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'name': self.name,
            'industry': self.industry,
            'price': self.price,
            'address': self.address,
            'averageVolume': self.averageVolume,
            'averageVolume10days': self.averageVolume10days,
            'beta': self.beta,
            'city': self.city,
            'country': self.country,
            'debtToEquity': self.debtToEquity,
            'ebitda': self.ebitda,
            'fiftyDayAverage': self.fiftyDayAverage,
            'fiftyTwoWeekHigh': self.fiftyTwoWeekHigh,
            'fiftyTwoWeekLow': self.fiftyTwoWeekLow,
            'floatShares': self.floatShares,
            'forwardEps': self.forwardEps,
            'forwardPE': self.forwardPE,
            'freeCashflow': self.freeCashflow,
            'fullTimeEmployees': self.fullTimeEmployees,
            'grossMargins': self.grossMargins,
            'grossProfits': self.grossProfits,
            'heldPercentInsiders': self.heldPercentInsiders,
            'heldPercentInstitutions': self.heldPercentInstitutions,
            'logo_url': self.logo_url,
            'longBusinessSummary': self.longBusinessSummary,
            'longName': self.longName,
            'marketCap': self.marketCap,
            'operatingCashflow': self.operatingCashflow,
            'operatingMargins': self.operatingMargins,
            'phone': self.phone,
            'profitMargins': self.profitMargins,
            'recommendationKey': self.recommendationKey,
            'recommendationMean': self.recommendationMean,
            'revenueGrowth': self.revenueGrowth,
            'revenuePerShare': self.revenuePerShare,
            'sector': self.sector,
            'sharesOutstanding': self.sharesOutstanding,
            'sharesShort': self.sharesShort,
            'shortName': self.shortName,
            'shortPercentOfFloat': self.shortPercentOfFloat,
            'shortRatio': self.shortRatio,
            'state': self.state,
            'totalCash': self.totalCash,
            'totalCashPerShare': self.totalCashPerShare,
            'totalDebt': self.totalDebt,
            'totalRevenue': self.totalRevenue,
            'twoHundredDayAverage': self.twoHundredDayAverage,
            'volume': self.volume,
            'website': self.website,
            'zip_code': self.zip_code
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
