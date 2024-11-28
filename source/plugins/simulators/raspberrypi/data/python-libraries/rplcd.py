scl = machine.Pin('X9')
sda = machine.Pin('X10')
i2c = machine.I2C(scl=scl, sda=sda)

class CharLCD:
	def __init__(self, cols, rows, pin_rs, pin_e, pins_data):
		self.cols = cols
		self.rows = rows
		self.pin_rs = pin_rs
		self.pin_e = pin_e
		self.pins_data = pins_data
	
	cursor_pos = ()
	def write_string(self, buffer):
		i2c.writeto(8, buffer)
