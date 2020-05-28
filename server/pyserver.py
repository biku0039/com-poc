import zerorpc
import sys

c = zerorpc.Client()
c.connect("tcp://127.0.0.1:4242")
name = sys.argv[1] if len(sys.argv) > 1 else "dude"
print (c.hello(name))
