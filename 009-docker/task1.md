- craft@HP:~$ docker ps
- CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
- craft@HP:~$ docker pull busybox:latest
- latest: Pulling from library/busybox
- 4b35f584bb4f: Pull complete
- Digest: sha256:b5d6fe0712636ceb7430189de28819e195e8966372edfc2d9409d79402a0dc16
- Status: Downloaded newer image for busybox:latest
- docker.io/library/busybox:latest
- craft@HP:~$ docker run --name pinger -i -t busybox ping -c 7 netology.ru
- PING netology.ru (188.114.98.224): 56 data bytes
- 64 bytes from 188.114.98.224: seq=0 ttl=37 time=59.083 ms
- 64 bytes from 188.114.98.224: seq=1 ttl=37 time=24.045 ms
- 64 bytes from 188.114.98.224: seq=2 ttl=37 time=24.867 ms
- 64 bytes from 188.114.98.224: seq=3 ttl=37 time=25.406 ms
- 64 bytes from 188.114.98.224: seq=4 ttl=37 time=24.898 ms
- 64 bytes from 188.114.98.224: seq=5 ttl=37 time=28.167 ms
- 64 bytes from 188.114.98.224: seq=6 ttl=37 time=24.831 ms

- --- netology.ru ping statistics ---
- 7 packets transmitted, 7 packets received, 0% packet loss
- round-trip min/avg/max = 24.045/30.185/59.083 ms
- craft@HP:~$ docker ps
- CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
- craft@HP:~$ docker ps -a
- CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
- 6cab956f6dc7 busybox "ping -c 7 netology.…" About a minute ago Exited (0) About a minute ago pinger
- craft@HP:~$ docker start pinger
- pinger
- craft@HP:~$ docker logs -f -t pinger
- 2023-04-05T07:38:25.114696300Z PING netology.ru (188.114.98.224): 56 data bytes
- 2023-04-05T07:38:25.172369500Z 64 bytes from 188.114.98.224: seq=0 ttl=37 time=59.083 ms
- 2023-04-05T07:38:26.137951500Z 64 bytes from 188.114.98.224: seq=1 ttl=37 time=24.045 ms
- 2023-04-05T07:38:27.139127300Z 64 bytes from 188.114.98.224: seq=2 ttl=37 time=24.867 ms
- 2023-04-05T07:38:28.140472100Z 64 bytes from 188.114.98.224: seq=3 ttl=37 time=25.406 ms
- 2023-04-05T07:38:29.140718000Z 64 bytes from 188.114.98.224: seq=4 ttl=37 time=24.898 ms
- 2023-04-05T07:38:30.144790100Z 64 bytes from 188.114.98.224: seq=5 ttl=37 time=28.167 ms
- 2023-04-05T07:38:31.142997900Z 64 bytes from 188.114.98.224: seq=6 ttl=37 time=24.831 ms
- 2023-04-05T07:38:31.143096300Z
- 2023-04-05T07:38:31.143122700Z --- netology.ru ping statistics ---
- 2023-04-05T07:38:31.143144100Z 7 packets transmitted, 7 packets received, 0% packet loss
- 2023-04-05T07:38:31.143165200Z round-trip min/avg/max = 24.045/30.185/59.083 ms
- 2023-04-05T07:41:51.667636200Z PING netology.ru (188.114.98.224): 56 data bytes
- 2023-04-05T07:41:51.688155800Z 64 bytes from 188.114.98.224: seq=0 ttl=37 time=21.650 ms
- 2023-04-05T07:41:52.691482500Z 64 bytes from 188.114.98.224: seq=1 ttl=37 time=24.495 ms
- 2023-04-05T07:41:53.688849200Z 64 bytes from 188.114.98.224: seq=2 ttl=37 time=21.716 ms
- 2023-04-05T07:41:54.688595400Z 64 bytes from 188.114.98.224: seq=3 ttl=37 time=21.140 ms
- 2023-04-05T07:41:55.688930500Z 64 bytes from 188.114.98.224: seq=4 ttl=37 time=21.098 ms
- 2023-04-05T07:41:56.693983700Z 64 bytes from 188.114.98.224: seq=5 ttl=37 time=24.860 ms
- 2023-04-05T07:41:57.694579100Z 64 bytes from 188.114.98.224: seq=6 ttl=37 time=25.595 ms
- 2023-04-05T07:41:57.694658400Z
- 2023-04-05T07:41:57.694675900Z --- netology.ru ping statistics ---
- 2023-04-05T07:41:57.694690500Z 7 packets transmitted, 7 packets received, 0% packet loss
- 2023-04-05T07:41:57.695284900Z round-trip min/avg/max = 21.098/22.936/25.595 ms
- craft@HP:~$ docker rm pinger
- pinger
- craft@HP:~$ docker rmi busybox
- Untagged: busybox:latest
- Untagged: busybox@sha256:b5d6fe0712636ceb7430189de28819e195e8966372edfc2d9409d79402a0dc16
- Deleted: sha256:7cfbbec8963d8f13e6c70416d6592e1cc10f47a348131290a55d43c3acab3fb9
- Deleted: sha256:baacf561cfff825708763ce7ee4a18293716c533e6ece3bd39009a5fb3c804d2