#!/usr/bin/env python
import cgi, os
import cgitb; cgitb.enable()




try: # Windows needs stdio set for binary mode.
    import msvcrt
    msvcrt.setmode (0, os.O_BINARY) # stdin  = 0
    msvcrt.setmode (1, os.O_BINARY) # stdout = 1
except ImportError:
    pass



form = cgi.FieldStorage()
action = form.getfirst("action", "")
if action == "getreq":
	text1 = form.getfirst("TEXT_1", "not set")
	text2 = form.getfirst("TEXT_2", "not set")
	print("Content-type: text/html\n")
	print("""<!DOCTYPE HTML><html><head><meta charset="utf-8"><title>Form Data Processing</title></head><body>""")
	print("<h1>Form Data Processing!</h1>")
	print("<p>TEXT_1: {}</p>".format(text1))
	print("<p>TEXT_2: {}</p>".format(text2))
	print("""</body></html>""")
elif action == "postreq":
		text3 = form.getfirst("TEXT_3", "not set")
		print("Content-type: text/html\n")	
		print("""<!DOCTYPE HTML>
				<html>
				<head>
					<meta charset="utf-8">
					<title>
		Form Data Processing</title>
				</head>
				<body>""")
		print("<h1>Form Data Processing!</h1>")	
		print("<p>TEXT_3: {}</p>".format(text3))
		print("""</body>
			</html>""")
elif action == "filereq":
		print("Content-type: text/html\n")
		print("""<!DOCTYPE HTML>
			<html>
			<head>
				<meta charset="utf-8">
				<title>
	Form Data Processing</title>
			</head>
			<body>""")

		# A nested FieldStorage instance holds the file
		fileitem = form['file']

		# Test if the file was uploaded

		if fileitem.filename:

			# strip leading path from file name
			# to avoid directory traversal attacks
			fn = os.path.basename(fileitem.filename)
			open('cgi-bin/' + fn, 'wb').write(fileitem.file.read())
			message = 'The file "' + fn + '" was uploaded successfully'

		else:
			message = 'No file was uploaded'

			print ("""\
				Content-Type: text/html\n
				<html><body>
				<p>%s</p>
				</body></html>
				""" "message")