import asyncio
import socket

# Call the send_message function with the server address and port
await send_message(message, server_address, server_port)
    # Create a socket object
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Define the server address and port using method arguments
    server_address = (server_address, server_port)

    # Connect to the server
    await asyncio.get_event_loop().sock_connect(client_socket, server_address)

    # Send data to the server
    client_socket.sendall(message.encode())

    # Receive data from the server
    data = await asyncio.get_event_loop().sock_recv(client_socket, 1024)
    print('Received:', data.decode())

# Call the function with the desired message
message = 'Hello, server!'
received_data = asyncio.run(send_message(message, '192.168.1.1', 8080))
print('Received:', received_data)
