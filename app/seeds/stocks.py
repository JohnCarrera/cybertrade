from app.models.watchlist_stock import db, Stock

def seed_stocks():
    AMZN = Stock(
        symbol='AMZN',
        name='Amazon',
        industry='Internet & Direct Marketing Retail'
    )
    NFLX = Stock(
        symbol='NFLX',
        name='Netflix',
        industry='Entertainment'
    )
    GOOG = Stock(
        symbol='GOOG',
        name='Google/Alphabet',
        industry='Interactive Media & Services'
    )
    MSFT = Stock(
        symbol='MSFT',
        name='Microsoft',
        industry='Software'
    )
    TSLA = Stock(
        symbol='TSLA',
        name='Tesla',
        industry='Automobiles'
    )
    META = Stock(
        symbol='META',
        name='Meta',
        industry='Interactive Media & Services'
    )
    NVDA = Stock(
        symbol='NVDA',
        name='NVIDIA',
        industry='Semiconductors & Semiconductor Equipment'
    )
    ORCL = Stock(
        symbol='ORCL',
        name='Oracle',
        industry='Software'
    )
    CSCO = Stock(
        symbol='CSCO',
        name='Cisco Systems',
        industry='Communications Equipment'
    )
    CRM = Stock(
        symbol='CRM',
        name='Salesforce.com',
        industry='Software'
    )
    ADBE = Stock(
        symbol='ADBE',
        name='Adobe',
        industry='Software'
    )
    QCOM = Stock(
        symbol='QCOM',
        name='Qualcomm',
        industry='Semiconductors & Semiconductor Equipment'
    )
    IBM = Stock(
        symbol='IBM',
        name='IBM',
        industry='IT Services'
    )
    INTC = Stock(
        symbol='INTC',
        name='Intel',
        industry='Semiconductors & Semiconductor Equipment'
    )
    PYPL = Stock(
        symbol='PYPL',
        name='PayPal Holdings',
        industry='IT Services'
    )
    AMD = Stock(
        symbol='AMD',
        name='Advanced Micro Devices',
        industry='Semiconductors & Semiconductor Equipment'
    )
    SONY = Stock(
        symbol='SONY',
        name='Sony Group',
        industry='Household Durables'
    )
    ABNB = Stock(
        symbol='ABNB',
        name='Airbnb',
        industry='Hotels, Restaurants & Leisure'
    )
    MU  = Stock(
        symbol='MU',
        name='Micron Technology',
        industry='Semiconductors & Semiconductor Equipment'
    )
    TEAM = Stock(
        symbol='TEAM',
        name='Atlassian',
        industry='Software'
    )
    VMW = Stock(
        symbol='VMW',
        name='VMware',
        industry='Software'
    )
    ATVI = Stock(
        symbol='ATVI',
        name='Activision Blizzard',
        industry='Entertainment'
    )
    UBER = Stock(
        symbol='UBER',
        name='Uber Technologies',
        industry='Road & Rail'
    )
    ADSK = Stock(
        symbol='ADSK',
        name='Autodesk',
        industry='Software'
    )
    ZM  = Stock(
        symbol='ZM',
        name='Zoom Video Communications',
        industry='Software'
    )
    DELL = Stock(
        symbol='DELL',
        name='Dell Technologies',
        industry='Technology Hardware, Storage & Peripherals'
    )
    EA  = Stock(
        symbol='EA',
        name='Electronic Arts',
        industry='Entertainment'
    )
    TWTR = Stock(
        symbol='TWTR',
        name='Twitter',
        industry='Interactive Media & Services'
    )
    SNOW = Stock(
        symbol='SNOW',
        name='Snowflake',
        industry='IT Services'
    )
    TXN = Stock(
        symbol='TXN',
        name='Texas Instruments',
        industry='Semiconductors & Semiconductor Equipment'
    )

    db.session.add(AMZN)
    db.session.add(NFLX)
    db.session.add(GOOG)
    db.session.add(MSFT)
    db.session.add(TSLA)
    db.session.add(META)
    db.session.add(NVDA)
    db.session.add(ORCL)
    db.session.add(CSCO)
    db.session.add(CRM)
    db.session.add(ADBE)
    db.session.add(QCOM)
    db.session.add(IBM)
    db.session.add(INTC)
    db.session.add(PYPL)
    db.session.add(AMD)
    db.session.add(SONY)
    db.session.add(ABNB)
    db.session.add(MU)
    db.session.add(TEAM)
    db.session.add(VMW )
    db.session.add(ATVI)
    db.session.add(UBER)
    db.session.add(ADSK)
    db.session.add(ZM)
    db.session.add(DELL)
    db.session.add(EA)
    db.session.add(TWTR)
    db.session.add(SNOW)
    db.session.add(TXN)

    db.session.commit()

def undo_stocks():
    db.session.execute('TRUNCATE stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
