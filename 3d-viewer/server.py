#!/usr/bin/env python3
"""
Simple HTTP server per servire i file del visualizzatore 3D
Risolve i problemi CORS quando si apre il file HTML direttamente
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Aggiungi header CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Log personalizzato
        print(f"[{self.address_string()}] {format % args}")

def main():
    # Cambia nella directory del server
    os.chdir(Path(__file__).parent)
    
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print(f"\n{'='*60}")
        print(f"🚀 Server avviato su http://localhost:{PORT}")
        print(f"📂 Directory: {os.getcwd()}")
        print(f"🌐 Apri nel browser: {url}")
        print(f"{'='*60}\n")
        print("Premi CTRL+C per fermare il server\n")
        
        # Apri automaticamente nel browser
        try:
            webbrowser.open(url)
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n⏹️  Server fermato")
            httpd.shutdown()

if __name__ == "__main__":
    main()

