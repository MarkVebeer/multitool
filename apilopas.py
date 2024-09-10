import requests
from bs4 import BeautifulSoup
import time

def yt_download(yt_url):
    try:
        cookie_req_url = 'https://en.y2mate.is/'
        response = requests.get(cookie_req_url)

        soup = BeautifulSoup(response.text, 'html.parser')
        csrf_token = soup.find('meta', attrs={'name':'csrf-token'}).get('content')
        cookies = response.cookies
        cookiedata = ''
        for cookie in cookies:
            cookiedata += f'{cookie.name}={cookie.value};'
        
        payload = f"--kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A\r\nContent-Disposition: form-data; name=\"url\"\r\n\r\n{yt_url}\r\n--kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A--\r\n"

        headers = {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Cookie": f"{cookiedata}",
        "Origin": "https://en.y2mate.is",
        "Referer": "https://en.y2mate.is/v49/youtube-to-mp3.html",
        "X-Csrf-Token": f"{csrf_token}",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data; boundary=kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A" 
        }
        data_request = requests.request("POST",'https://en.y2mate.is/analyze', data=payload, headers=headers).json()

        audio_192 = data_request['formats']['audio'][2]
        convert_url = "https://en.y2mate.is/convert"
        conv_payload = f"--kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A\r\nContent-Disposition: form-data; name=\"hash\"\r\n\r\n{audio_192['hash']}\r\n--kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A--\r\n"
        conv_res = requests.request("POST", convert_url, data=conv_payload,  headers=headers).json()

        task_id = conv_res['taskId']
        task_payload = f"--kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A\r\nContent-Disposition: form-data; name=\"taskId\"\r\n\r\n{task_id}\r\n--kljmyvW1ndjXaOEAg4vPm6RBUqO6MC5A--\r\n"
        task_res = requests.request("POST", 'https://en.y2mate.is/task', headers=headers, data=task_payload).json()
        time.sleep(5)
        task_res = requests.request("POST", 'https://en.y2mate.is/task', headers=headers, data=task_payload).json()

        print(f"{task_res['download']}")

    except Exception as e:
        print(e)

if __name__ == "__main__":
    import sys
    yt_download(sys.argv[1])
