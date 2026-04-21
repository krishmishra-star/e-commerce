#include <iostream>
using namespace std;

char board[3][3] = { {'1', '2', '3'},
                     {'4', '5', '6'},
                     {'7', '8', '9'} };

char currentMarker;
int currentPlayer;

// Function to display the board
void drawBoard() {
    cout << "\n";
    for (int i = 0; i < 3; i++) {
        cout << " " << board[i][0] << " | " << board[i][1] << " | " << board[i][2] << " \n";
        if (i < 2) cout << "---|---|---\n";
    }
    cout << "\n";
}

// Function to place a marker
bool placeMarker(int slot) {
    int row = (slot - 1) / 3;
    int col = (slot - 1) % 3;

    if (board[row][col] != 'X' && board[row][col] != 'O') {
        board[row][col] = currentMarker;
        return true;
    } else {
        cout << "Slot already taken! Try again.\n";
        return false;
    }
}

// Function to check winner
int checkWinner() {
    // Rows
    for (int i = 0; i < 3; i++)
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2])
            return currentPlayer;

    // Columns
    for (int i = 0; i < 3; i++)
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i])
            return currentPlayer;

    // Diagonals
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2])
        return currentPlayer;
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0])
        return currentPlayer;

    return 0; // No winner yet
}

// Function to swap player
void swapPlayerAndMarker() {
    if (currentMarker == 'X')
        currentMarker = 'O';
    else
        currentMarker = 'X';

    if (currentPlayer == 1)
        currentPlayer = 2;
    else
        currentPlayer = 1;
}

void game() {
    cout << "Player one, choose your marker (X or O): ";
    cin >> currentMarker;
    currentPlayer = 1;
    drawBoard();

    int playerWon = 0;
    for (int i = 0; i < 9; i++) {
        cout << "Player " << currentPlayer << ", choose your slot: ";
        int slot;
        cin >> slot;

        if (slot < 1 || slot > 9) {
            cout << "Invalid slot! Try again.\n";
            i--;
            continue;
        }

        if (!placeMarker(slot)) {
            i--;
            continue;
        }

        drawBoard();
        playerWon = checkWinner();
        if (playerWon == 1 || playerWon == 2) {
            cout << "🎉 Player " << playerWon << " wins! 🎉\n";
            return;
        }

        swapPlayerAndMarker();
    }

    cout << "😐 It's a draw! 😐\n";
}

int main() {
    cout << "===== TIC TAC TOE =====\n";
    game();
    return 0;
}
