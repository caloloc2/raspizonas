#!/usr/bin/python
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(2, GPIO.OUT) ## GPIO 2 como salida
GPIO.setup(3, GPIO.OUT) ## GPIO 3 como salida
GPIO.setup(4, GPIO.OUT) ## GPIO 4 como salida
GPIO.setup(17, GPIO.OUT) ## GPIO 17 como salida

def lectura():
	dato = ''
	hora = ''
	archivo = open("estados.rsp", "r") 
	for linea in archivo.readlines():		
		dato+= linea

	horario = open("hora.rsp", "r") 
	for linea in horario.readlines():		
		hora+= linea

	actual = time.strftime("%H:%M")

	if (actual==hora):		
		dato="1111"

	if (dato=="10"):
		print "Zona 1 desactivada"
		GPIO.output(2, False) ## Enciendo el 2
	if (dato=="11"):
		print "Zona 1 activada"
		GPIO.output(2, True) ## Enciendo el 2

	if (dato=="20"):
		print "Zona 2 desactivada"
		GPIO.output(3, False) ## Enciendo el 3
	if (dato=="21"):
		print "Zona 2 activada"
		GPIO.output(3, True) ## Enciendo el 3

	if (dato=="30"):
		print "Zona 3 desactivada"
		GPIO.output(4, False) ## Enciendo el 4
	if (dato=="31"):
		print "Zona 3 activada"
		GPIO.output(4, True) ## Enciendo el 4

	if (dato=="40"):
		print "Zona 4 desactivada"
		GPIO.output(17, False) ## Enciendo el 17
	if (dato=="41"):
		print "Zona 4 activada"	
		GPIO.output(17, True) ## Enciendo el 17

	if (dato=="1111"):
		print "Todas las zonas activadas"	
		GPIO.output(2, True) ## Enciendo el 2
		GPIO.output(3, True) ## Enciendo el 3
		GPIO.output(4, True) ## Enciendo el 4
		GPIO.output(17, True) ## Enciendo el 17

while(1):
	lectura()
	time.sleep(0.1)

	#GPIO.cleanup() ## Hago una limpieza de los GPIO