import sys
from bs4 import BeautifulSoup as soup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.add_argument("--headless")
options.add_argument("window-size=1400,1500")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("start-maximized")
options.add_argument("enable-automation")
options.add_argument("--disable-infobars")
options.add_argument("--disable-dev-shm-usage")




DRIVER_PATH ='/usr/bin/chromedriver'
driver = webdriver.Chrome(options=options)

URL = "https://www.amazon.ca/s?k=" + sys.argv[1] + "&ref=nb_sb_noss_2"
URL2 = "https://www.amazon.ca/s?k=2080ti&ref=nb_sb_noss_2"
driver.get(URL)
page_soup = soup(driver.page_source, "html.parser")

item_container = page_soup.findAll("div", {"class": "a-spacing-medium"})
item_container = item_container[:-1]

#opens form root
filename = "./public/ProductFiles/ProductAmazon.txt"
f = open(filename, "w")

i = 0
for container in item_container:
    img_com = container.findAll("span", {"data-component-type": "s-product-image"})
    try:
        Title = img_com[0].a.div.img["alt"]
    except AttributeError:
        print("TitelAtErr", i)

    small = container.findAll("div", {"class": "a-spacing-top-small"})
    Price = "Unavaliable"
    try:
        Price = small[1].div.div.a.span.span.text[5:]
    except AttributeError:
        print("PriceAtErr", i)
    except IndexError:
        print("PriceIdxErr", i)

    micro = container.findAll("div", {"class": "a-spacing-top-micro"})
    ReviewNum = "0"
    try:
        micro_span = micro[0].findAll("span", {"aria-label": True})
        ReviewNum = micro_span[-1].text.rstrip()
        ReviewNum = ReviewNum.lstrip()
        try:
            ReviewNum = ReviewNum.replace(',', '')
            re = int(ReviewNum)
            ReviewNum = str(re)
        except ValueError:
            ReviewNum = "0"
            print("ValueIdxErr", i)
    except AttributeError:
        print("ReviewNumAtErr", i)
    except IndexError:
        print("ReviewNumIdxErr", i)
    except ValueError:
        print("ValueIdxErr", i)

    Rating = "0"
    try:
        Rating = micro[0].div.span["aria-label"]
        if ("stars" in Rating):
            Rating = Rating
        else :
            print("NoRating", i)
            Rating = "0"
    except AttributeError:
        print("RatingAtErr", i)
    except IndexError:
        print("RatingIdxErr", i)
    except KeyError:
        print("RatingKeyErr", i)
        

    '''
    Shipping = "None"
    try:
        Shipping = micro[1].div.span["aria-label"][5:]
    except AttributeError:
        print("ShippingAtErr", i)
    except IndexError:
        print("ShippingIdxErr", i)
    except KeyError:
        print("ShippingKeyErr", i)
    '''
    i = i + 1

    #f.write(Title.replace(",", "|") + "," + Price.replace(",", "") + "," + Rating + "," + ReviewNum + "," + "\n")
    f.write(Title + "\n" + Price + "\n" + Rating + "\n" + ReviewNum + "\n\n")
    #print(Title + "\n" + Price + "\n" + Rating + "\n" + ReviewNum )
    
    #f.write(Rating + "\n")

driver.quit()
f.close()
