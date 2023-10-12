import machine

# Mapping BCM to Board
# ! generic_raspberrypi has Board - 1
BoardToBCM = {
	"3": 2,
	"5": 3,
	"7": 4,
	"29": 5,
	"31": 6,
	"26": 7,
	"24": 8,
	"21": 9,
	"19": 10,
	"23": 11,
	"32": 12,
	"33": 13,
	"8": 14,
	"10": 15,
	"36": 16,
	"11": 17,
	"12": 18,
	"35": 19,
	"38": 20,
	"40": 21,
	"15": 22,
	"16": 23,
	"18": 24,
	"22": 25,
	"37": 26
}	

def convertToBCM(pin, isBoard):
	if isBoard == 100:
		return int(BoardToBCM[str(pin)])
	else:
		return pin

class GPIO:
	HIGH = 1
	LOW = 0
	BOARD = 100
	BCM = 0
	IN = -5
	OUT = 5

	def setmode(mode):
		if mode == GPIO.BOARD:
			GPIO.BOARD = 100
		elif mode == GPIO.BCM:
			GPIO.BOARD = -100

	# To do: create logic
	def setup(givenPin, mode, pull_up_down='pull_up_down=GPIO.PUD_DOWN'):
		return True

	def output(givenPin, mode):
		givenPin = convertToBCM(givenPin, GPIO.BOARD)
		pin = machine.Pin(str(givenPin))
		if mode == GPIO.HIGH or mode == True or mode == 1:
			pin(1)
		elif mode == GPIO.LOW or mode == False or mode == 0:
			pin(0)

	def input(givenPin):
		givenPin = convertToBCM(givenPin, GPIO.BOARD)
		pin = machine.Pin(str(givenPin))
		return pin()
