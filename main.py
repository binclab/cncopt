#!/usr/bin/env python3

import os
import threading
import subprocess
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

os.chdir("/usr/local/share/cncopt")

port = 8493
host = "localhost"


def start_server():
    address = (host, port)
    server = ThreadingHTTPServer(address, SimpleHTTPRequestHandler)
    server.serve_forever()

link = f"http://{host}:{port}/optimizer-1-7-1a.swf"
thread = threading.Thread(name="daemon_server", target=start_server)
thread.daemon = True
thread.start()
subprocess.run(["/usr/local/share/cncopt/flashplayer", link])
