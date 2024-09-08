# Installation de coturn sur un serveur Ubuntu
sudo apt-get update
sudo apt-get install coturn

# Configuration de coturn
sudo nano /etc/turnserver.conf

# Ajoutez les lignes suivantes dans le fichier de configuration
listening-port=3478
tls-listening-port=5349
listening-ip=<YOUR_SERVER_IP>
external-ip=<YOUR_SERVER_IP>
realm=studly.com
server-name=studly.com
lt-cred-mech
userdb=/etc/turnuserdb.conf
# Générez une clé de chiffrement forte pour les credentials
static-auth-secret=<YOUR_STRONG_SECRET_KEY>

# Démarrez le service coturn
sudo systemctl start coturn
sudo systemctl enable coturn
