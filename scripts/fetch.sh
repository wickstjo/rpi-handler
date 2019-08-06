cd /home/wickstjo/

# REMOVE THE OLD CAM DIR
sudo rm -rf cam/
sudo mkdir cam/

# DOWNLOAD THE RPI DIR
sudo rm -rf rpi-handler/
sudo scp bdalab@193.167.32.156:/home/bdalab/wickstjo/rpi.zip .

# UNZIP, EXTRACT & DELETE THE FILE
sudo unzip rpi.zip
sudo rm -rf rpi.zip