// PROGRAM NAME - OREGON VERSION 1 01/01/78
// ORIGINAL PROGRAMMING BY BILL HEINEMANN - 1071
// SUPP0RT RESEARCH AND MATERIALS BY DON RAVITSCH, MINNES0TA EDUCATIONAL COMPUTING CONSORTIUM STAFF
// CDC CYBER 70/73-26 BASIC 3-1
// FOR THE MEANING OF THE VARIABLES USED: LIST LINES 6470-6790

160 PRINT "DO YOU NEED INSTRUCTIONS (YES/NO)"
170 DIM C$(5)
190 INPUT C$
200 IF C$ = "W" THEN 690
210 PRINT
220 PRINT
// •••INSTRUCTIONS***
240 PRINT "THIS PROGRAM SIMULATES A TRIP OVER THE OREGON TRAIL FROM"
250 PRINT "INDEPENDENCE* MISSOURI TO OREGON CITY, OREGON IN 1847."
260 PRINT "YOUR FAMILY OF FIVE BILL COVER THE 2040 NILE OREGON TRAIL"
270 PRINT "IN 5-6 MONTHS — IF YOU MAKE IT ALIVE*"
280 PRINT
290 PRINT "YOU HAD SAVED 8900 TO SPEND FOR THE TRIP* AND YOU'VE JUST"
300 PRINT " PAID 8200 FOR A WAGON . -
310 PRINT "YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ON THE"
320 PRINT " FOLLOWING XTEMSt"
330 PRINT
340 PRINT " OXEN - YOU CAN SPEND 8200-8300 ON YOUR TEAM"
350 PRINT " THE MORE YOU SPEND* THE FASTER YOU*LL 00"
360 PRINT " BECAUSE YOU'LL HAVE BETTER ANIMALS"
370 PRINT
360 PRINT " FOOD - THE MORE YOU HAVE* THE LESS CHANCE THERE"
390 PRINT " XS OF OETTXNG SICK"
400 PRINT
410 PRINT " AMMUNITION - 81 BUYS A BELT OF 50 BULLETS"
420 PRINT " YOU WILL NEED BULLETS FOR ATTACKS BY ANIMALS"
430 PRINT " AND BANDITS* AND FOR HUNTING FOOD"
440 PRINT
450 PRINT " CLOTHING - THIS IS ESPECIALLY IMPORTANT FOR THE COLD"
460 PRINT " WEATHER YOU WILL ENCOUNTER WHEN CROSSING"
470 PRINT " THE MOUNTAINS"
460 PRINT
490 PRINT " MISCELLANEOUS SUPPLIES - THIS INCLUDES MEDICINE AND"
500 PRINT " OTHER THINGS YOU WILL NEED FOR SICKNESS"
510 PRINT " AND EMERGENCY REPAIRS"
520 PRINT
530 PRINT
540 PRINT "YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -"
550 PRINT "OR YOU CAN SAVE SOME OF YOUR CASH TO SPEND AT FORTS ALONG"
560 PRINT "THE WAY WHEN YOU RUN LOW. H0WEVER, ITEMS COST MORE AT"
570 PRINT "THE FORTS. YOU CAN ALSO GO HUNTING ALONG THE WAY TO GET"
580 PRINT "MORE FOOD."
590 PRINT "WHENEVER YOU HAVE TO USE YOUR TRUSTY RIFLE ALONG THE WAY*"
600 PRINT "YOU WILL BE TOLD TO TYPE IN A WORD (ONE THAT SOUNDS LIKE A"
610 PRINT "GUN SHOT). THE FASTER YOU TYPE IN THAT WORD AND HIT THE"
620 PRINT """RETURN"" KEY* THE BETTER LUCK YOU'LL HAVE WITH YOUR GUN."
630 PRINT
640 PRINT "AT EACH TURN* ALL ITEMS ARE SHOWN IN DOLLAR AMOUNTS"
650 PRINT "EXCEPT BULLETS"
660 PRINT "WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A ""$""."
670 PRINT
680 PRINT "GOOD LUCK!!!"

690 PRINT
700 PRINT
710 PRINT "HOW GOOD A SHOT ARE YOU WITH YOUR RIFLE?"
720 PRINT " (I) ACE MARKSMAN, (2) GOOD SHOT, (3) FAIR TO MIDDLIN'"
730 PRINT " (4) NEED MORE PRACTICE, (5) SHAKY KNEES"
740 PRINT "ENTER ONE OF THE ABOVE -- THE BETTER YOU CLAIM YOU ARE, THE'
750 PRINT "FASTER YOU'LL HAVE TO BE WITH YOUR GUN TO BE SUCCESSFUL."
760 INPUT D9
770 IF D9 > 5 THEN 790
760 G0T0 810
790 D9 = 0

// *** INITIAL PURCHASES***
810 X1 = -1
820 K8 = S4 = F1 = F2 = M = M9 = D3 = 0
830 PRINT
840 PRINT
850 PRINT "HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM";
860 INPUT A
870 IF A >= 200 THEN 900
880 PRINT "NOT ENOUGH"
890 GOTO 850
900 IF A <= 300 THEN 930
910 PRINT "TOO MUCH"
920 GOTO 850
930 PRINT "HOW MUCH DO YOU WANT TO SPEND ON FOOD";
940 INPUT F
950 IF F >= 0 THEN 980
960 PRINT "IMPOSSIBLE"
970 GOTO 930
... "HOW MUCH DO YOU WANT TO SPEMD ON MISCELLANEOUS AMMUNITION" -> B
... "HOW MUCH DO YOU WANT TO SPEMD ON MISCELLANEOUS CLOTHING" -> C
... "HOW MUCH DO YOU WANT TO SPEMD ON MISCELLANEOUS SUPPLIES" -> M1
T = 700 - A - F - B - C - M1

IF T >= 0 THEN 1170
PRINT "YOU OVERSPENT--YOU ONLY HAD $700 TO SPEND.  BUY AGAIN"
GOTO 830
1170 B = 50 * B
PRINT "AFTER ALL YOUR PURCHASES, YOU NOV HAVE ${T} DOLLARS LEFT"
PRINT
PRINT "MONDAY MARCH 29 1847"
PRINT
GOTO 1750

1230 IF M >= 2040 THEN 5430
// ***SETTING DATE***
D3 = D3 + l
PRINT
PRINT "MONDAY ";
IF D3 > 10 THEN 1300
ON D3 GOTO 1310, 1330, 1350, 1370, 1390, 1410, 1430, 1450, 1470, 1490
ON D3 - 10 GOTO 1510, 1530, 1550, 1570, 1590, 1610, 1630, 1650, 1670, 1690
1310 PRINT "APRIL 12 ";
G0T0 1720
1330 PRINT "APRIL 06 ";
G0T0 1720
1350 PRINT "MAY 10 ";
G0T0 1720
1370 PRINT "MAY 24 ";
GOTO 1720
1390 PRINT "JUNE 7 ";
GOTO 1720
1410 PRINT "JUNE 21 ";
GOTO 1720
1430 PRINT "JULY 5 ";
GOTO 1720
1450 PRINT "JULY 19 ";
G0T0 1720
1470 PRINT "AUGUST 2 ";
G0T0 1720
1490 PRINT "AUGUST 16 ";
G0T0 1720
1510 PRINT "AUGUST 31 ";
GOTO 1720
1530 PRINT "SEPTEMBER 13 ";
G0T0 1720
1550 PRINT "SEPTEMBER 27 ";
GOTO 1720
1570 PRINT "OCTOBER 11 ";
G0T0 1720
1590 PRINT "OCTOBER 25 ";
G0T0 1720
1610 PRINT "NOVEMBER 8 ";
GOTO 1720
1630 PRINT "NOVEMBER 22 ";
GOTO 1720
1650 PRINT "DECEMBER 6 ";
GOTO 1720
1670 PRINT "DECEMBER 20 ";
GOTO 1720
PRINT "YOU HAVE BEEN ON THE TRAIL T00 LONG  ------"
PRINT "YOUR FAMILY DIES IN THE FIRST BLIZZARD OF WINTER"
GOTO 5170

1720 PRINT "1847"
PRINT

// ***BEGINNING EACH TURN***
IF F >= 0 THEN 1770
F = 0
1770 IF B >= 0 THEN 1790
B = 0
1790 IF C >= 0 THEN 1810
C = 0
1810 IF Ml >= 0 THEN 1830
M1 = 0
1830 IF F >= 13 THEN 1850
PRINT "YOU'D BETTER DO SOME HUNTING OR BUY FOOD AND SOON!!!!"
1850
F = INT(F)
B = INT(B)
C = INT(C)
Ml = INT(M1)
T = INT(T)
M = INT(M)
M2 = M
IF S4 = 1 THEN 1950
IF K8 = 1 THEN 1950
G0T0 1990

1950 T = T - 20
IF T < 0 THEN 5080
PRINT "DOCTOR'S BILL IS $20"
LET K8 = S4 = 0

1990 IF M9 = 1 THEN 2020
PRINT "TOTAL MILEAGE IS";M
GOT0 2040

2020 PRINT "TOTAL MILEAGE IS 950"
M9 = 0

2040 PRINT "FOOD", "BULLETS", "CLOTHING", "MISC. SUPP.", "CASH"
PRINT F, B, C, M1, T
IF Xl = -1 THEN 2170
X1 = X1 * (-1)
PRINT "DO YOU WANT TO (1) STOP AT THE NEXT FORT, (2) HUNT, OR (3) CONTINUE"
INPUT X
IF X > 2 THEN 2150
IF X < 1 THEN 2150
LET X = INT(X)
G0T0 2270

2150 LET X = 3
GOT0 2270

2170 PRINT "DO YOU WANT TO (1) HUNT, OR (2) CONTINUE"
INPUT X
IF X = l THEN 2210
LET X = 2
2210 LET X = X + 1
IF X = 3 THEN 2260
IF B > 39 THEN 2260
PRINT "T0UGH---Y0U NEED MORE BULLETS T0 G0 HUNTING"
G0T0 2170

2260 X1 = X1 * (-1)

2270 0N X O0T0 2290, 2540, 2720

// ***ST0PPING AT FORT***
2290 PRINT "ENTER WHAT Y0U WISH T0 SPEND 0N THE F0LL0WING F00D";
G0SUB 2330
G0T0 2410
  
2330 INPUT P

IF P«0 THEN 2400 T-T-P

IF T »• THEN 2400

PRINT -Y0U D0N*T HAVE THAT MUCH— KEEP Y0UR SPENDING DOWNPRINT "YOU MISS Y0UR CHANCE T0 SPEND 0N THAT ITEM** T-T*P P«0 RETURN F»F* 2/ 3*P

PRINT "AMMUNITION"! G0SUB 2330

LET B*INTCB*2/3*P*50> PRINT -CLOTHING"! 00 SUB 2330 C»C*2/3*P

PRINT "MISCELLANEOUS SUPPLIES**! 00 SUB 2330 M1-H1*2/3*P M»H-45 G0T0 2720 REM •••HUNTING*** IF B»39 THEN 2570

PRINT "TOUGH YOU NEED M0RE BULLETS TO 00 HUNTING**

G0T0 2080

W W 01

OOSUB 6140

IF Bl <- 1 THEN 2660

IF 100*RND(-1X13*B1 THEN 2710

F"F*48-2*B1

PRINT "NICE SH0T--RIGHT ON TARGET— GOOD EATXN * TONIGHT!!"

B-B-10-3*B1

G0TO 2720

REM ••BELLS IN LINE 2660**

PRINT "RIGHT BETWEEN THE EYES™ YOU OOT A BIG ONE!!!!"

PRINT "FULL BELLIES TONIBKTI"

F*F*52*RNDC-1>»6

B*B-1O-F0ID<-I>*4

OOT0 2720

PRINT "Y0U MISSED--- AND YOUR DINNER OOT AWAY "

IF F >• 13 THEN 2750

G0T0 5060

REM •••EATING***

PRINT "DO YOU WANT TO EAT <1> POORLY (2) M0DERATELY"

PRINT "0R <3> WELL"!

INPUT E

IF E>3 THEN 2750

If M THEN 27S0

LET E-INT(E)

LET F«F-8-5*E

IF F >■ THEN 2860

F»F*8*5*E

PRINT "Y0U CAN'T EAT THAT WELL"

O0T0 2750

LET H»H*200*<A-220>/S*10*RND<-1>

L1-C1-0

REM •••RIDERS ATTACK***

IF RND(-l)*10>C(M/100-4)»«2*72)/<<M/100-4)»«2*12)-l THEN 3550

PRINT "RIDERS AHEAD* THEY »|

S5-0

IF RNDC-1X.8 THEN 2950

PRINT

S5-1

PRINT

PRINT

PRINT

•DON'T "J

2970 2970

3330 3110

"LO0K HOSTILE"

"TACTICS"

"(1> RUN (2) ATTACK IF RNDC-1)>.2 THEN 3000 S5-I-S5 INPUT Tl IF Tl* 1 THEN IF Tl»4 THEN T1«INT<TI) IF S5-1 THEN IF T1>1 THEN M"M*20 M1-M1-1S B-B-I50 A* A- 40 G0T0 3470 IF Tl>2 THEN G0SUB 6140 B-B-Bl»40-80 IF B1>1 THEN PRINT "NICE G0T0 3470

IF Bl «■ 4 THEN 3220 PRINT "L0USY SH0T---Y0U K8-1

PRINT "Y0U HAVE T0 SEE 0L* G0T0 3470

PRINT "K1NDA SL0V WITH Y0UR OOT0 3470 IF Tl>3 THEN 3290 IF RND(-1)>.8 THEN 3450 LET B-B-150 Ml-Ml-15 OOT0 3470 G0SUB 6140 B-B-Bl»30-80 N-N-25
