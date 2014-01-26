#!/usr/bin/env python

from colorama import Fore, Style, init
import random

init()

class Stack(object):
    def __init__(self, basecol, side):
        self.stack = [basecol]
        self.side = side
    
    def combine(self, other, new_side):
        assert(len(other.stack) == 1)
        cost = self.next_cost()
        self.stack.append(other.stack[0])
        self.side = new_side
        newsize = len(self.stack)
        # return number of moves required to establish stack
        return cost
    
    def is_singleton(self):
        return len(self.stack) == 1
    
    def next_cost(self):
        return len(self.stack)
    
    def __str__(self):
        pretty = {
            'red': Fore.RED + 'R',
            'yellow' : Fore.YELLOW + 'Y',
            'green': Fore.GREEN + 'G',
            'blue': Fore.BLUE + 'B',
            'purple': Fore.MAGENTA + 'P',
        }
        s = Style.BRIGHT
        for x in self.stack:
            s += pretty[x]
        return s + Fore.RESET + Style.RESET_ALL + ' '
    
    def score(self, point_vals):
        return sum(point_vals[x] for x in self.stack)

def score_game(stacks, point_vals, moves):
    p1_stacks = filter(lambda x: x.side == 1, stacks)
    p2_stacks = filter(lambda x: x.side == 2, stacks)
    
    p1_score = sum(s.score(point_vals) for s in p1_stacks)
    p2_score = sum(s.score(point_vals) for s in p2_stacks)
    
    print 'Preliminary score: %s - %s' % (p1_score, p2_score)
    
    p1_score += moves[1]
    p2_score += moves[2]
    
    if p1_score > p2_score:
        print 'P1 wins (%s - %s)!' % (p1_score, p2_score)
    elif p2_score > p1_score:
        print 'P2 wins (%s - %s)!' % (p1_score, p2_score)
    else:
        print 'Tie! (%s - %s)!' % (p1_score, p2_score)

def run_trial():
    print 'new game!'
    point_vals = {
                  'red': random.choice((-2, -1, 1, 2)) + random.choice((-2, -1, 1, 2)),
                  'yellow': random.choice((-2, -1, 1, 2)) + random.choice((-2, -1, 1, 2)),
                  'green': random.choice((-2, -1, 1, 2)) + random.choice((-2, -1, 1, 2)),
                  'blue': random.choice((-2, -1, 1, 2)) + random.choice((-2, -1, 1, 2)),
                  'purple': random.choice((-2, -1, 1, 2)) + random.choice((-2, -1, 1, 2)),
                  }
    moves = {1: 15, 2: 15}
    start_stacks = ['red', 'red', 'yellow', 'yellow', 'green', 'green', 'blue', 'blue', 'purple', 'purple']
    stacks = []
    stacks += [Stack(col, 1) for col in start_stacks]
    stacks += [Stack(col, 2) for col in start_stacks]
    player = 1
    # TODO: voluntary passes
    forced_pass = False
    while all([x > 0 for x in moves.values()]) and any([stack.is_singleton() for stack in stacks]):
        # print current board
        s = '1 (%s): ' % moves[1]
        for stack in filter(lambda x: x.side == 1, stacks):
            s += str(stack)
        print s
        s = '2 (%s): ' % moves[2]
        for stack in filter(lambda x: x.side == 2, stacks):
            s += str(stack)
        print s
        # enumerate legal moves
        legal_moves = []
        for singleton in filter(lambda x: x.is_singleton(), stacks):
            for other_stack in filter(lambda x: x != singleton, stacks):
                if other_stack.next_cost() <= moves[player]:
                    legal_moves.append((singleton, other_stack, 1))
                    legal_moves.append((singleton, other_stack, 2))
        if legal_moves:
            move = random.choice(legal_moves)
            moves[player] -= move[1].combine(move[0], move[2])
            stacks.remove(move[0])
        elif not forced_pass:
            forced_pass = True
        elif forced_pass:
            score_game(stacks, point_vals, moves)
            print 'game over (double pass)!'
            return
        # change player before ending turn
        player = 1 if player == 2 else 2
    score_game(stacks, point_vals, moves)
    print 'game over (%s)!' % ('out of moves' if not all([x > 0 for x in moves.values()]) else 'no singletons')

def main():
    print 'Shape Hoarding or Whatever The Fuck This Game Is!'
    while True:
        run_trial()

if __name__ == '__main__':
    main()
