#include <iostream>
#include <ctime>  // For time()
#include <string> // For string
#include <limits> // For numeric_limits
#include <thread> // For this_thread::sleep_for
#include <chrono> // For chrono::milliseconds
using namespace std;

void thinkeffect()
{
    cout << "Thinking";
    for (int i = 0; i < 3; ++i)
    {
        cout << ".";
    }
    cout << endl;
}
void setcolor(string color)
{
    if (color == "red")
    {
        cout << "\033[31m"; // ANSI escape code for red
    }
    else if (color == "green")
    {
        cout << "\033[32m"; // ANSI escape code for green
    }
    else if (color == "yellow")
    {
        cout << "\033[33m"; // ANSI escape code for yellow
    }
    else if (color == "blue")
    {
        cout << "\033[34m"; // ANSI escape code for blue
    }
    else if (color == "magenta")
    {
        cout << "\033[35m"; // ANSI escape code for magenta
    }
    else if (color == "cyan")
    {
        cout << "\033[36m"; // ANSI escape code for cyan
    }
    else if (color == "reset")
    {
        cout << "\033[0m"; // Reset to default color
    }
}
int main()
{
    srand(time(0)); // Seed for random number generation
    cout << "==========================\n";
    cout << "     Welcome to MoodMate  \n";
    cout << "==========================\n\n";

    while (true)
    {
        setcolor("cyan");

        cout << "How are you feeling today?\n"
             << endl;
        cout << "1. Happy\n";
        cout << "2. Sad\n";
        cout << "3. Angry\n";
        cout << "4. Bored\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: " << endl;
        setcolor("reset");
        int choice;
        cin >> choice;

        if (cin.fail())
        {
            cin.clear();                                         // clear error flag
            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // discard bad input
            cout << "Invalid input! Please enter a number between 1 and 5.\n\n";
            continue; // go back to start of while loop
        }

        if (choice == 1)
        {
            setcolor("green");
            thinkeffect();
            string happyquotes[] = {
                "The purpose of our lives is to be happy. - Dalai Lama ",

                "A state of happiness is not a goal to be achieved, it's a condition to be experienced. - Abraham Hicks",

                "Count your age by friends, not years. Count your life by smiles, not tears. - John Lennon ",

                "The most happy people seem to have no particular reason for being so except that they are happy. - William Ralph Inge ",
            };
            cout << happyquotes[rand() % 4] << "\n\n";
            setcolor("reset");
            continue;
        }
        else if (choice == 2)
        {
            setcolor("red");
            thinkeffect();
            string sadquotes[] = {
                "Tough times never last, but tough people do. - Robert H. Schuller",
                "Sadness flies away on the wings of time. - Jean de La Fontaine",
                "The word 'happy' would lose its meaning if it were not balanced by sadness. - Carl Jung",
                "Every human walks around with a certain kind of sadness. They may not wear it on their sleeve, but it's there if you look deep. - Taraji P. Henson",
            };
            int sadIndex = rand() % 4; // Random index between 0 and 3
            cout << sadquotes[sadIndex] << endl;
            setcolor("reset");
            continue;
        }
        else if (choice == 3)
        {
            setcolor("yellow");
            thinkeffect();
            string angryquotes[] = {
                "For every minute you remain angry, you give up sixty seconds of peace of mind. - Ralph Waldo Emerson",
                "Anger is one letter short of danger. - Eleanor Roosevelt",
                "Speak when you are angry and you will make the best speech you will ever regret. - Ambrose Bierce",
                "Anger is a wind which blows out the lamp of the mind. - Robert Green Ingersoll",
            };
            int angryIdex = rand() % 4;
            cout << angryquotes[angryIdex] << endl;
            setcolor("reset");
            continue;
        }
        else if (choice == 4)
        {
            setcolor("magenta");
            thinkeffect();
            string boredquotes[] = {
                "The cure for boredom is curiosity. There is no cure for curiosity. - Dorothy Parker",
                "Boredom is the root of all evil – the despairing refusal to be oneself. - Soren Kierkegaard",
                "Life is never boring, but some people choose to be bored. - Wayne Dyer",
                "Boredom: the desire for desires. - Leo Tolstoy",
            };
            int boresdIndex = rand() % 4;
            cout << boredquotes[boresdIndex] << endl;
            setcolor("reset");
            continue;
        }
        else if (choice == 5)
        {
            break; // Exit the loop if a valid choice was made
        }
        else
        {
            setcolor("darkred");
            cout << "Invalid choice. Please enter a number between 1 and 4.\n";
            setcolor("reset");
        }
    }

    return 0;
}
